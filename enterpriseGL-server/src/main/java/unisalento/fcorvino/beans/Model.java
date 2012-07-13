package unisalento.fcorvino.beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import unisalento.fcorvino.beans.models.ModelTable;

/**
 *
 * @author Francesco Corvino
 */
public class Model {
    
    public enum ModelStatus {
        Complete, Incomplete
    };
    
    private TreeSet<Particle> particles;
    private List relations;
    private String name;
    private ModelTable typeModel;
    private Date lastChange;
    private ModelStatus status;
    
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getLastChange() {
        return lastChange;
    }

    public void setLastChange(Date lastChange) {
        this.lastChange = lastChange;
    }

    public ModelStatus getStatus() {
        return status;
    }

    public void setStatus(ModelStatus status) {
        this.status = status;
    }

    public ModelTable getTypeModel() {
        return typeModel;
    }

    public void setTypeModel(ModelTable typeModel) {
        this.typeModel = typeModel;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Model other = (Model) obj;
        if ((this.name == null) ? (other.name != null) : !this.name.equals(other.name)) {
            return false;
        }
        return true;
    }
    
}
