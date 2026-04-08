package com.app.dto;

public class AssetDTO {
    private String type;
    private Double value;

    public AssetDTO() {
    }

    public AssetDTO(String type, Double value) {
        this.type = type;
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
