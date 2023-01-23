package dev.vinicius;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.jboss.logging.Logger;

import dev.vinicius.controller.DataIntegrationController;
import dev.vinicius.controller.RankingController;
import io.quarkus.scheduler.Scheduled;

@ApplicationScoped
public class SystemScheduler {

  @Inject
  Logger log;

  @Inject
  DataIntegrationController integration;

  @Inject
  RankingController ranking;

  // @Scheduled(every = "30s") // limit 10 calls by minute
  // public void refreshCompetitionStatistics() {
  // try {
  // integration.refreshCompetition();
  // // todo: Competition WC URL
  // // "https://api.football-data.org/v4/competitions/WC/matches"
  // // todo: Competition BSA URL
  // // "https://api.football-data.org/v4/competitions/BSA/matches"
  // } catch (Exception e) {
  // log.info("Erro ao atualizar estadísticas de jogo. " + e.getMessage());
  // }
  // }

  // @Scheduled(every = "30s")
  // public void refreshScoresByUser() {
  // try {
  // ranking.calcAllScores();
  // ranking.sortRanking();
  // } catch (Exception e) {
  // log.info("Erro ao atualizar ranking. " + e.getMessage());
  // }
  // }

}
