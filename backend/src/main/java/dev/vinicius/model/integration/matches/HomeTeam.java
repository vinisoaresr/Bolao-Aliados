package dev.vinicius.model.integration.matches;

public class HomeTeam {

    public Integer id;
    public String name;
    public String shortName;
    public String tla;
    public String crest;

    /**
     * No args constructor for use in serialization
     */
    public HomeTeam() {
    }

    /**
     * @param name
     * @param tla
     * @param id
     * @param shortName
     * @param crest
     */
    public HomeTeam(Integer id, String name, String shortName, String tla, String crest) {
        super();
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.tla = tla;
        this.crest = crest;
    }

}
