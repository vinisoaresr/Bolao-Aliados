package dev.vinicius.model.integration.resultset;

public class ResultSet {

    public Integer count;
    public String first;
    public String last;
    public Integer played;

    /**
     * No args constructor for use in serialization
     */
    public ResultSet() {
    }

    /**
     * @param last
     * @param count
     * @param played
     * @param first
     */
    public ResultSet(Integer count, String first, String last, Integer played) {
        super();
        this.count = count;
        this.first = first;
        this.last = last;
        this.played = played;
    }

}
