package unisalento.fcorvino.beans;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 * @author Francesco Corvino
 */
public class Model {
    private Set particles;
    private List relations;
    
    public Model(){
        this.particles = new HashSet();
        this.relations = new ArrayList();
    }

    public Set getParticles() {
        return particles;
    }

    public void setParticles(Set particles) {
        this.particles = particles;
    }

    public List getRelations() {
        return relations;
    }

    public void setRelations(List relations) {
        this.relations = relations;
    }
    
}
