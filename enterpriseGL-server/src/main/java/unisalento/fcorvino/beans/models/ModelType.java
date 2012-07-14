package unisalento.fcorvino.beans.models;

import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Francesco Corvino
 */
public class ModelType {
    private String typeId;
    private Set<ModelTable> tables = new HashSet<ModelTable>();

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
