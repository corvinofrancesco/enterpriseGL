package unisalento.fcorvino.etl.loader;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.Particle;
import unisalento.fcorvino.etl.EtlLoadBean;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco
 */
public class ParticleLoader implements EtlLoadBean<Particle> {
    
    private Map<Integer,Field> fields = new HashMap<Integer, Field>();

    public void addField(Integer id, EtlLoadTypes type, Object value) {
        Field f = new Field(id,type,value);
        this.fields.put(f.id, f);
    }

    public void addBeanTo(EntModel m) {
        Particle p = getBean();
        if(p!=null) 
            p.setId((Integer) fields.get(0).value);
        p.setDefinition((String)fields.get(1).value);
        p.setDescription((String)fields.get(2).value);
        p.setAssumption((Date)fields.get(3).value);
        m.getParticles().add(p);
    }

    public Particle getBean() {        
        Particle p = null;
        try {
            Integer id = (Integer) fields.get(0).value;
            String shortText = (String) fields.get(1).value;
            String longText = (String) fields.get(2).value;
            // 4 data data
            p = new Particle(id);
            p.setDefinition(shortText);
            p.setDescription(longText);
        } catch(Exception e){}
        return p;
    }

    public void clearData() {
        fields = new HashMap<Integer,Field>();
    }
    
}
