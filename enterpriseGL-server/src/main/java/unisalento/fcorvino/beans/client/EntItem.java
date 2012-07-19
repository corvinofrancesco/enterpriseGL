package unisalento.fcorvino.beans.client;

/**
 *
 * @author Francesco Corvino
 */
public class EntItem {
    private Integer id;
    private String description;
    private String definition;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
