package dev.vinicius.controller;

import javax.enterprise.context.ApplicationScoped;
import dev.vinicius.model.entity.MatchStatus;
import dev.vinicius.model.entity.Transactions;
import dev.vinicius.model.entity.Match;

import java.util.Objects;

@ApplicationScoped
public class ScoreController {

    /*
     * (re)Calc score by transaction
     *
     * @param transaction
     */
    public Integer calcScore(Transactions transaction) {
        int score = 0;
        Match match = Match.findById(transaction.match.id);

        if (Objects.isNull(transaction) || Objects.isNull(match)) {
            return 0;
        }
        if (match.status == MatchStatus.FINISHED || match.status == MatchStatus.IN_PLAY
                || match.status == MatchStatus.PAUSED) {
            if (!Objects.isNull(match.score)) {
                if (isPerfectHit(transaction, match)) {
                    return 10;
                } else if (isPlusHit(transaction, match)) {
                    return 7;
                } else if (isBasicHit(transaction, match)) {
                    return 5;
                } else if (isReverseHit(transaction, match)) {
                    return -2;
                } else
                    return 0;
            }
        }
        return 0;
    }

    // Acerto perfeito
    private boolean isPerfectHit(Transactions transaction, Match match) {
        return (Objects.equals(match.score.homeTeam, transaction.goals_homeTeam))
                && (Objects.equals(match.score.awayTeam, transaction.goals_awayTeam));
    }

    /*
     * Acerto plus Acerto Plus
     * quando acerta quem será o vencedor e também acerta a quantidade
     * de gols de alguma das seleções.
     */
    private boolean isPlusHit(Transactions transaction, Match match) {
        boolean isHomeTeam = false;
        boolean isAwayTeam = false;
        boolean isHomeTeamTransaction = false;
        boolean isAwayTeamTransaction = false;

        if (match.score.homeTeam > match.score.awayTeam) {
            isHomeTeam = true;
        } else if (match.score.homeTeam < match.score.awayTeam) {
            isAwayTeam = true;
        }
        if (transaction.goals_homeTeam > transaction.goals_awayTeam) {
            isHomeTeamTransaction = true;
        } else if (transaction.goals_homeTeam < transaction.goals_awayTeam) {
            isAwayTeamTransaction = true;
        }
        return (isHomeTeam && isHomeTeamTransaction
                && Objects.equals(match.score.homeTeam, transaction.goals_homeTeam)
                && !Objects.equals(match.score.awayTeam, transaction.goals_awayTeam))
                || (isAwayTeam && isAwayTeamTransaction
                        && Objects.equals(match.score.awayTeam, transaction.goals_awayTeam)
                        && !Objects.equals(match.score.homeTeam, transaction.goals_homeTeam));
    }

    // Acerto Básico
    // quando acerta apenas quem será o vencedor ou o empate, sem acertar a
    // quantidade de gols
    private boolean isBasicHit(Transactions transaction, Match match) {
        boolean isHomeTeam = false;
        boolean isAwayTeam = false;
        boolean isHomeTeamTransaction = false;
        boolean isAwayTeamTransaction = false;

        if (match.score.homeTeam > match.score.awayTeam) {
            isHomeTeam = true;
        } else if (match.score.homeTeam < match.score.awayTeam) {
            isAwayTeam = true;
        }
        if (transaction.goals_homeTeam > transaction.goals_awayTeam) {
            isHomeTeamTransaction = true;
        } else if (transaction.goals_homeTeam < transaction.goals_awayTeam) {
            isAwayTeamTransaction = true;
        }

        return (isHomeTeam && isHomeTeamTransaction) || (isAwayTeam && isAwayTeamTransaction);
    }

    // Acerto invertido
    private boolean isReverseHit(Transactions transaction, Match match) {
        return (Objects.equals(match.score.homeTeam, transaction.goals_awayTeam))
                && (Objects.equals(match.score.awayTeam, transaction.goals_homeTeam));
    }

}