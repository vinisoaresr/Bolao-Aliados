package dev.vinicius.model.integration.matches;

public class HalfTime {

    public Object home;
    public Object away;

    /**
     * No args constructor for use in serialization
     */
    public HalfTime() {
    }

    /**
     * @param away
     * @param home
     */
    public HalfTime(Object home, Object away) {
        super();
        this.home = home;
        this.away = away;
    }

}
