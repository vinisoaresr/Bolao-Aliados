package dev.vinicius.model.DTO;

import java.util.List;

public class GenericDTO {
    public boolean success;
    public Object data;
    public List<String> errors;

    public GenericDTO(Boolean success, Object data, List<String> errors) {
        this.success = success;
        this.data = data;
        this.errors = errors;
    }
}
