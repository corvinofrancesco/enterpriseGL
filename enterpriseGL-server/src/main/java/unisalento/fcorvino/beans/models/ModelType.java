package unisalento.fcorvino.beans.models;

import java.util.Set;

/**
 *
 * @author Francesco Corvino
 */
public class ModelType {
    private String typeId;
    private Set<ModelTable> tables;

    public Set<ModelTable> getTables() {
        return tables;
    }

    public void setTables(Set<ModelTable> tables) {
        this.tables = tables;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }
        
}
