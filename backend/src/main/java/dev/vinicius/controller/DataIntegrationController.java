package dev.vinicius.controller;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.vinicius.model.integration.Integration;
import dev.vinicius.utils.HttpService;
import io.quarkus.logging.Log;

@ApplicationScoped
public class DataIntegrationController {

    @ConfigProperty(name = "BASE_URL_FOOTBALL_API")
    String BASE_URL_API;
    @ConfigProperty(name = "TOKEN_FOOTBALL_API")
    String TOKEN_API;
    @ConfigProperty(name = "ENDPOINT_MATCHS")
    String ENDPOINT_MATCHS;

    @Inject
    Logger log;

    @Inject
    HttpService httpService;

    @Inject
    CompetitionController competitionController;

    public void refreshCompetition() {
        httpService.GET(BASE_URL_API + ENDPOINT_MATCHS, TOKEN_API).thenAccept(
                response -> {
                    log.info("-> HTTP Request " + ENDPOINT_MATCHS + "| STATUS " + response.statusCode());
                    try {
                        var mapper = new ObjectMapper();
                        Integration data = mapper.readValue(response.body(), Integration.class);
                        competitionController.refreshData(data);
                    } catch (JsonProcessingException e) {
                        log.info("Erro ao realizar parse response API" + e.getMessage() + response.body());
                    }
                });
    }
}
