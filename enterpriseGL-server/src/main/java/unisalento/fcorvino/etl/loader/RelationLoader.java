/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.etl.loader;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import unisalento.fcorvino.beans.Model;
import unisalento.fcorvino.beans.Particle;
import unisalento.fcorvino.beans.Relation;
import unisalento.fcorvino.etl.EtlLoadBean;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco
 */
public class RelationLoader implements EtlLoadBean<Relation> {

    private Map<Integer,Field> fields = new HashMap<Integer, Field>();

    public void addField(Integer id, EtlLoadTypes type, Object value) {
        Field f = new Field(id,type,value);
        this.fields.put(f.id, f);
    }

    public void addBeanTo(Model m) {
        Relation r = getBean();        
        if(r!=null) {
            Set<Particle> particles = m.getParticles();
            // overide origina particles in model  
            if(particles.contains(r.getSource())){
                r.setSource(
                        m.findParticle(r.getSource().getId()));
            }
            if(particles.contains(r.getDestination())){
                r.setDestination(
                        m.findParticle(r.getDestination().getId()));
            }
            m.getRelations().add(r);
        }
    }

    public Relation getBean() {
        Relation r = null;
        try {
            Integer idSource = (Integer) fields.get(0).value;
            Integer idDestination = (Integer) fields.get(1).value;            
            r = new Relation(
                    new Particle(idSource), new Particle(idDestination));
        } catch(Exception e){}
        return r;
    }

    public void clearData() {
        this.fields = new HashMap<Integer,Field>();
    }
    
}
