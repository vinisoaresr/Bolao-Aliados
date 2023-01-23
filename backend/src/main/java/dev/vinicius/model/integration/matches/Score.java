package dev.vinicius.model.integration.matches;

public class Score {

    public Object winner;
    public String duration;

    public FullTime fullTime;
    public HalfTime halfTime;
    
    public FullTime regularTime;
    public FullTime extraTime;
    public FullTime penalties;

    /**
     * No args constructor for use in serialization
     */
    public Score() {
    }

    /**
     * @param duration
     * @param winner
     * @param halfTime
     * @param fullTime
     */
    public Score(Object winner, String duration, FullTime fullTime, HalfTime halfTime) {
        super();
        this.winner = winner;
        this.duration = duration;
        this.fullTime = fullTime;
        this.halfTime = halfTime;
    }

}
