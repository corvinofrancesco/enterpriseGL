package unisalento.fcorvino.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import unisalento.fcorvino.beans.Model;
import unisalento.fcorvino.beans.Model.ModelStatus;
import unisalento.fcorvino.beans.models.ModelTable;
import unisalento.fcorvino.beans.models.ModelType;
import unisalento.fcorvino.etl.loader.ParticleLoader;
import unisalento.fcorvino.etl.loader.RelationLoader;

/**
 * Class realised to build a enterprise model bean 
 * 
 * @see unisalento.fcorvino.beans.Model class
 * 
 * @author Francesco Corvino
 */
public class ModelsBuilder {
    private Model current = new Model();
    private ModelsFactory factory = new ModelsFactory();
    
    private static Map<String,ModelType> modelTypes = new HashMap<String, ModelType>();
    
    static {
        ModelType simpleParticle = new ModelType();
        simpleParticle.getTables().add(
                new ModelTable("particles","Describe all particles of a system.",new ParticleLoader()));
        simpleParticle.getTables().add(
                new ModelTable("relations","Describe all relations between particles of the system.",new RelationLoader()));
        modelTypes.put("simple nodes", simpleParticle);
        ModelType personal = new ModelType();        
        //TODO configure personal model type
        modelTypes.put("personal", personal);
        //TODO add other model types
    } 

    public Model getModel() {
        return current;
    }

    public void setModel(Model current) {
        this.current = current;
    }
    
    /**
     * Delegate method of setter Name in Model
     * @see unisalento.fcorvino.beans.Model#name
     * 
     * @param name 
     */
    public void setName(String name){
        current.setName(name);
    }
    
    /**
     * Delegate method of setter Status in Model
     * @see unisalento.fcorvino.beans.Model#status
     * 
     * @param modelStatus 
     */
    public void setStatus(ModelStatus modelStatus) {
        current.setStatus(modelStatus);
    }    
    
    /**
     * Delegate method of setter TypeModel in Model
     * @see unisalento.fcorvino.beans.Model#typeModel
     * 
     * This method controls if the typeModel is defined
     * 
     * @param modelStatus 
     */
    public void setType(String type){
       if(modelTypes.containsKey(type)){
           current.setTypeModel(modelTypes.get(type));
       } 
    }
    
    public static Set<String> getTypes(){
        return modelTypes.keySet();
    }
        
    /**
     * 
     * @return true if the configured model is valid
     */
    public Boolean isValid(){
        if(factory.getModel(current.getName())==null) return false;        
        if(current.getTypeModel()==null) return false;
        if(current.getStatus()!=ModelStatus.Incomplete){
            if(current.getParticles().isEmpty()) return false;
        }
        return true;
    }
    
    /**
     * This function create the model, the method save it only if the model is valid
     * 
     * @return true if the model is saved
     */
    public Boolean build(){
        if(!isValid()) return false;
        current.setLastChange(new Date());        
        factory.addModel(current);
        return true;
    }

}
