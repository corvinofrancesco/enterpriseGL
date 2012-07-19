package unisalento.fcorvino.beans.models;

import java.util.List;
import unisalento.fcorvino.beans.client.EntItem;

/**
 *
 * @author Francesco Corvino
 */
public class EntModelPack {
    private Integer idPacket;
    private Boolean lastPacket;
    private List<EntItem> items; 

    public Integer getIdPacket() {
        return idPacket;
    }

    public void setIdPacket(Integer idPacket) {
        this.idPacket = idPacket;
    }

    public Boolean getLastPacket() {
        return lastPacket;
    }

    public void setLastPacket(Boolean lastPacket) {
        this.lastPacket = lastPacket;
    }

    public List<EntItem> getItems() {
        return items;
    }

    public void setItems(List<EntItem> items) {
        this.items = items;
    }
    
}
