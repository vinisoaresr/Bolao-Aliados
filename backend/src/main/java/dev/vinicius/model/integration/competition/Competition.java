package dev.vinicius.model.integration.competition;

public class Competition {

    public Integer id;
    public String name;
    public String code;
    public String type;
    public String emblem;

    /**
     * No args constructor for use in serialization
     */
    public Competition() {
    }

    /**
     * @param code
     * @param name
     * @param id
     * @param type
     * @param emblem
     */
    public Competition(Integer id, String name, String code, String type, String emblem) {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
        this.emblem = emblem;
    }

}
