package dev.vinicius.model.integration.matches;

public class FullTime {

    public Integer home;
    public Integer away;

    /**
     * No args constructor for use in serialization
     */
    public FullTime() {
    }

    /**
     * @param away
     * @param home
     */
    public FullTime(Integer home, Integer away) {
        super();
        this.home = home;
        this.away = away;
    }

}
