package dev.vinicius.model.integration.matches;

public class Season {

    public Integer id;
    public String startDate;
    public String endDate;
    public Integer currentMatchday;
    public Object winner;

    /**
     * No args constructor for use in serialization
     *
     */
    public Season() {
    }

    /**
     *
     * @param winner
     * @param currentMatchday
     * @param endDate
     * @param id
     * @param startDate
     */
    public Season(Integer id, String startDate, String endDate, Integer currentMatchday, Object winner) {
        super();
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentMatchday = currentMatchday;
        this.winner = winner;
    }

}