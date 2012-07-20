package unisalento.fcorvino.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.TreeMap;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.Particle;
import unisalento.fcorvino.beans.Relation;
import unisalento.fcorvino.beans.client.EntChange;
import unisalento.fcorvino.beans.client.EntEvent;
import unisalento.fcorvino.beans.client.EntItem;
import unisalento.fcorvino.beans.client.EntParticle;
import unisalento.fcorvino.beans.models.EntModelPack;

/**
 *
 * @author Francesco Corvino
 */
public class ModelParser {
    private EntModel model;
    
    private SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
    
    private ArrayList<EntItem> items = new ArrayList<EntItem>(); 
    
    private TreeMap<Date,EntEvent> events = new TreeMap<Date , EntEvent>();

    private ArrayList<EntModelPack> packets = new ArrayList<EntModelPack>();

    public ModelParser(EntModel model) {
        this.model = model;
    }
    
    private EntEvent createEvent(Date date,EntChange change){
        if(date==null) return null;
        EntEvent event = new EntEvent();
        if(!events.containsKey(date)){
            event.setId("event" + format.format(date));
            event.setDate(date);
            events.put(date, event);
        } else {
            event = events.get(date);
        }
        event.getChanges().add(change);
        return event;
    }
    
    private EntEvent completeEvent(EntEvent prec, EntEvent curr){
        ArrayList<String> objects = new ArrayList<String>();
        if(prec!=null) {
            objects = prec.getObjects();
        }
        for(EntChange c : curr.getChanges()){
            switch(c.getType()){
                case END:
                    objects.remove(c.getElement().getId());
                    break;
                case INIT:
                    objects.add(c.getElement().getId());
                    break;
                case UPDATED:
                    //TODO 
                    break;                
            }
        }
        curr.setObjects(objects);
        return curr;
    }
    
    public void parse(){
        EntModelPack pack = new EntModelPack();
        // controls particles
        for(Particle p : model.getParticles()){
            EntParticle e = new EntParticle();
            e.setId(p.getId().toString());
            e.setDefinition(p.getDefinition());
            e.setDescription(p.getDescription());
            pack.getItems().add(e);
            createEvent(p.getAssumption(), new EntChange(EntChange.EntChangeTypes.INIT,e));
            createEvent(p.getEnd(),new EntChange(EntChange.EntChangeTypes.END,e));
        }
        // controls relations
        for(Relation r : model.getRelations()){
            
        }
        if(!events.isEmpty()){
            EntEvent prec = null;
            for(EntEvent ev : events.values()) {
                prec = completeEvent(prec, ev);
                pack.getItems().add(ev);
            }
        } else {
            // crea un unico evento
            EntEvent ev = new EntEvent();
            for(Particle p: model.getParticles())
                ev.getObjects().add(p.getId().toString());
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

    public SimpleDateFormat getFormat() {
        return format;
    }

    public void setFormat(SimpleDateFormat format) {
        this.format = format;
    }       
    
}
