/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.beans;

import unisalento.fcorvino.beans.models.ModelTable;
import unisalento.fcorvino.etl.EtlContext;
import unisalento.fcorvino.etl.EtlContext.FileType;

/**
 *
 * @author Francesco
 */
public class ModelTableInstance {
    private ModelTable tableType;
    private Boolean isLoad = false;
    private EtlContext.FileType source;
    private String sourceConfig;

    public Boolean getIsLoad() {
        return isLoad;
    }

    public void setIsLoad(Boolean isLoad) {
        this.isLoad = isLoad;
    }

    public FileType getSource() {
        return source;
    }

    public void setSource(FileType source) {
        this.source = source;
    }

    public String getSourceConfig() {
        return sourceConfig;
    }

    public void setSourceConfig(String sourceConfig) {
        this.sourceConfig = sourceConfig;
    }

    public ModelTable getTableType() {
        return tableType;
    }

    public void setTableType(ModelTable tableType) {
        this.tableType = tableType;
    }
    
}
