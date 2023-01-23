package dev.vinicius.controller;

import dev.vinicius.model.entity.Ranking;
import dev.vinicius.model.entity.User;
import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@ApplicationScoped
public class RankingController {

    @Inject
    ScoreController score;

    @Transactional
    public void calcAllScores() {
        List<User> users = User.listAll();
        users.forEach((user) -> {
            AtomicReference<Integer> points = new AtomicReference<>(0);
            user.transactions.forEach((transaction) -> {
                // score by transaction
                transaction.calculed_score = score.calcScore(transaction);
                points.set(points.get() + transaction.calculed_score);
            });
            // plus all scores transactions
            user.score = points.get();
            user.persist();
        });
    }

    /*
     * Sort ranking by users scores
     */
    @Transactional
    public void sortRanking() {
        List<User> users = User.listAll(Sort.by("score"));
        Collections.reverse(users);
        Ranking.deleteAll();
        AtomicReference<Integer> classification = new AtomicReference<>(1);

        users.forEach((user) -> {
            Ranking ranking = new Ranking(user, classification.get());
            ranking.updated = new Date();
            classification.updateAndGet(value -> value + 1);
            ranking.persist();
        });
    }

}