package dev.vinicius.model.integration.matches;

public class Area {

    public Integer id;
    public String name;
    public String code;
    public Object flag;

    /**
     * No args constructor for use in serialization
     */
    public Area() {
    }

    /**
     * @param code
     * @param flag
     * @param name
     * @param id
     */
    public Area(Integer id, String name, String code, Object flag) {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.flag = flag;
    }

}
