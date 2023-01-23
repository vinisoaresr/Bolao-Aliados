package dev.vinicius.controller;

import dev.vinicius.model.entity.Match;
import dev.vinicius.model.entity.MatchStatus;
import dev.vinicius.model.entity.Transactions;
import dev.vinicius.model.entity.User;
import org.jboss.logging.Logger;

import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class TransactionsController {

    @Inject
    Logger log;

    @Transactional
    public Transactions createTransaction(Transactions data, User user) {
        Match match = Match.findById(data.match.id);
        Transactions transaction = new Transactions();
        if (isValidInput(user, match) && notHasDuplicateTransaction(user, match)) {
            transaction.user = user;
            transaction.match = match;
            transaction.calculed_score = 0;
            transaction.goals_homeTeam = data.goals_homeTeam;
            transaction.goals_awayTeam = data.goals_awayTeam;
            transaction.created = new Date();
            transaction.updated = new Date();
            transaction.persist();
            log.info("user: " + user.name + " created transaction for match: " + match.homeTeam.name + " x "
                    + match.awayTeam.name + " - match status: " + match.status);
        }
        return transaction;
    }

    public Transactions updateTransaction(Transactions data, User user) {
        Transactions transaction = Transactions.findById(data.id);
        Match match = Match.findById(data.match.id);
        if (isValidInput(user, match)) {
            transaction.goals_homeTeam = data.goals_homeTeam;
            transaction.goals_awayTeam = data.goals_awayTeam;
            transaction.updatedAtByResource = new Date();
            transaction.persist();
            log.info("user: " + user.name + " updated transaction for match: " + match.homeTeam.name + " x "
                    + match.awayTeam.name + " - match status: " + match.status);
            return transaction;
        } else {
            return null;
        }
    }

    private Boolean isValidInput(User user, Match match) {
        var status = match.status;
        List<MatchStatus> allowedStates = List.of(
                MatchStatus.SCHEDULED,
                MatchStatus.TIMED);
        var gameDate = match.date;
        var currentDate = new Date();

        boolean isValid = false;

        if (user == null || user.isEmpty()) {
            return false;
        }

        if (gameDate.after(currentDate)) {
            isValid = true;
        } else {
            isValid = false;
        }

        if (allowedStates.contains(status)) {
            isValid = true;
        } else {
            isValid = false;
        }

        return isValid;

    }

    // percorre as transacoes do usuario e verificar se tem duplicado
    private boolean notHasDuplicateTransaction(User user, Match match) {
        AtomicBoolean isValid = new AtomicBoolean(true);
        user.transactions.forEach((transaction) -> {
            if (transaction.match == match) {
                isValid.set(false);
            }
        });
        return isValid.get();
    }
}
