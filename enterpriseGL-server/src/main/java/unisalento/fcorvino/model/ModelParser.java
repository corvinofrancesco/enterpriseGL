package unisalento.fcorvino.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.TreeMap;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.Particle;
import unisalento.fcorvino.beans.client.EntEvent;
import unisalento.fcorvino.beans.client.EntItem;
import unisalento.fcorvino.beans.models.EntModelPack;

/**
 *
 * @author Francesco Corvino
 */
public class ModelParser {
    private EntModel model;
    
    private ArrayList<EntModelPack> packets = new ArrayList<EntModelPack>();

    public ModelParser(EntModel model) {
        this.model = model;
    }
    
    public void parse(){
        EntModelPack pack = new EntModelPack();
        TreeMap<Date,EntEvent> events = new TreeMap<Date , EntEvent>();
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        for(Particle p : model.getParticles()){
            EntItem e = new EntItem();
            e.setId(p.getId().toString());
            e.setDefinition(p.getDefinition());
            e.setDescription(p.getDescription());
            pack.getItems().add(e);
            if(!events.containsKey(p.getAssumption())){
                EntEvent event = new EntEvent();
                event.setId("event" + format.format(p.getAssumption()));
                event.setDate(p.getAssumption());
                event.getObjects().add(p.getId());
                events.put(p.getAssumption(), event);
            } else {
                events.get(p.getAssumption()).getObjects().add(p.getId());
            }
        }
        if(!events.isEmpty()){
            for(EntEvent ev : events.values()){
                pack.getItems().add(ev);
            }
        } else {
            EntEvent ev = new EntEvent();
            for(Particle p: model.getParticles()) ev.getObjects().add(p.getId());
            pack.getItems().add(ev);
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
