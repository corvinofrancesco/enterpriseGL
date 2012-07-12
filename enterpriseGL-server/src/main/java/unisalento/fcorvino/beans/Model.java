package unisalento.fcorvino.beans;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 *
 * @author Francesco Corvino
 */
public class Model {
    private TreeSet<Particle> particles;
    private List relations;
    
    public Model(){
        this.particles = new TreeSet();
        this.relations = new ArrayList();
    }

    public Particle findParticle(Integer id){
        Particle subj = new Particle(id);
        return particles.ceiling(subj);
    }
    
    public Set getParticles() {
        return particles;
    }

    public void setParticles(Set particles) {
        this.particles = new TreeSet(particles);
    }

    public List getRelations() {
        return relations;
    }

    public void setRelations(List relations) {
        this.relations = relations;
    }
    
}
