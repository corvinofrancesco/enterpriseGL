package unisalento.fcorvino.beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import unisalento.fcorvino.beans.models.ModelType;

/**
 *
 * @author Francesco Corvino
 */
public class EntModel {
    
    public enum ModelStatus {
        Complete, Incomplete
    };
    
    private TreeSet<Particle> particles;
    private List relations;
    private String name;
    private ModelType typeModel = null;
    private Date lastChange = null;
    private ModelStatus status;
    private Map<String,ModelTableInstance> importTables 
            = new HashMap<String, ModelTableInstance>();
    
    public EntModel(){
        this.status = ModelStatus.Incomplete;
        this.particles = new TreeSet();
        this.relations = new ArrayList();
    }

    public Particle findParticle(Integer id){
        Particle subj = new Particle(id);
        return particles.ceiling(subj);
    }
    
    public Set<Particle> getParticles() {
        return particles;
    }

    public void setParticles(Set<Particle> particles) {
        this.particles = new TreeSet(particles);
    }

    public List<Relation> getRelations() {
        return relations;
    }

    public void setRelations(List<Relation> relations) {
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

    public ModelType getTypeModel() {
        return typeModel;
    }

    public void setTypeModel(ModelType typeModel) {
        this.typeModel = typeModel;
    }

    /**
     * Delegate method of put ModelTableInstance
     * 
     * @see Map#put(java.lang.Object, java.lang.Object) 
     */
    public ModelTableInstance putTable(String key, ModelTableInstance value) {
        return importTables.put(key, value);
    }

    /**
     * Delegate method of get ModelTableInstance
     * 
     * @see Map#get(java.lang.Object) 
     */
    public ModelTableInstance getTable(String key) {
        return importTables.get(key);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final EntModel other = (EntModel) obj;
        if ((this.name == null) ? (other.name != null) : !this.name.equals(other.name)) {
            return false;
        }
        return true;
    }
    
}
