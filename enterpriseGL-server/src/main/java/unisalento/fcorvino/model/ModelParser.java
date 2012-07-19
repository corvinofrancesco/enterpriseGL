/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.model;

import java.util.ArrayList;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.Particle;
import unisalento.fcorvino.beans.client.EntItem;
import unisalento.fcorvino.beans.models.EntModelPack;

/**
 *
 * @author Francesco
 */
public class ModelParser {
    private EntModel model;
    
    private ArrayList<EntModelPack> packets = new ArrayList<EntModelPack>();

    public ModelParser(EntModel model) {
        this.model = model;
    }
    
    public void parse(){
        EntModelPack pack = new EntModelPack();
        for(Particle p : model.getParticles()){
            EntItem e = new EntItem();
            e.setId(p.getId());
            e.setDefinition(p.getDefinition());
            e.setDescription(p.getDescription());
            pack.getItems().add(e);
        }
        pack.setIdPacket(0);
        pack.setLastPacket(true);
        packets.add(pack);
    }
    
    public EntModelPack getPacket(Integer id){
        EntModelPack pack = packets.get(id);
        if(pack==null){
            pack = new EntModelPack();
            pack.setIdPacket(id);
            pack.setLastPacket(true);
        }
        return pack;        
    }
    
}
