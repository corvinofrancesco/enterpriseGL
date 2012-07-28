package unisalento.fcorvino.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import org.springframework.web.multipart.MultipartFile;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.EntModel.ModelStatus;
import unisalento.fcorvino.beans.ModelTableInstance;
import unisalento.fcorvino.beans.models.ModelTable;
import unisalento.fcorvino.beans.models.ModelType;
import unisalento.fcorvino.etl.EtlBaseContext;
import unisalento.fcorvino.etl.EtlContext;
import unisalento.fcorvino.etl.loader.ParticleLoader;
import unisalento.fcorvino.etl.loader.RelationLoader;

/**
 * Class realised to build a enterprise model bean 
 * 
 * @see unisalento.fcorvino.beans.EntModel class
 * 
 * @author Francesco Corvino
 */
public class ModelsBuilder {
    private EntModel current = new EntModel();
    private ModelsFactory factory = new ModelsFactory();
    
    private static Map<String,ModelType> modelTypes = new HashMap<String, ModelType>();
            
    static {
        // modello con particelle e relazioni
        ModelType simpleParticle = new ModelType("simple nodes");
        simpleParticle.getTables().add(
                new ModelTable("particles","Describe all particles of a system.",new ParticleLoader()));
        simpleParticle.getTables().add(
                new ModelTable("relations","Describe all relations between particles of the system.",new RelationLoader()));
        modelTypes.put("simple nodes", simpleParticle);
        // modello dei dipendenti: un'unica tabella con dipendenti e gerarchia
        ModelType personal = new ModelType("personal");
        personal.getTables().add(
                new ModelTable("employees","Describe all employees of the enterprise and their hierarchy.",new ParticleLoader()));
        modelTypes.put("personal", personal);
        // modello dei servizi: una tabella per i servizi e una per le relazioni
        ModelType servicesRes = new ModelType("services resources");
        servicesRes.getTables().add(
                new ModelTable("services","Describe all services of the enterprise.",new ParticleLoader()));
        servicesRes.getTables().add(
                new ModelTable("relationsServ","Describe all relations between services.",new RelationLoader()));
        modelTypes.put("services resources", servicesRes);
        // modello delle applicazioni: una tabella per le applicazioni e una per le relazioni
        ModelType applicationsRes = new ModelType("applications resources");
        applicationsRes.getTables().add(
                new ModelTable("applications","Describe all applications of the enterprise.",new ParticleLoader()));
        applicationsRes.getTables().add(
                new ModelTable("relationsApp","Describe all relations between aplications.",new RelationLoader()));
        modelTypes.put("applications resources", applicationsRes);
        // modello dell'hardware: una tabella degli items e una per le relazioni
        ModelType hardwareRes = new ModelType("hardware resources");
        hardwareRes.getTables().add(
                new ModelTable("hardware","Describe all hardware devices of the enterprise.",new ParticleLoader()));
        hardwareRes.getTables().add(
                new ModelTable("relationsHw","Describe all relations between hardware devices.",new RelationLoader()));
        modelTypes.put("hardware resources", hardwareRes);        
    } 

    public EntModel getModel() {
        return current;
    }

    public void setModel(EntModel current) {
        this.current = current;
    }
    
    /**
     * Delegate method of setter Name in EntModel
     * @see unisalento.fcorvino.beans.EntModel#name
     * 
     * @param name 
     */
    public void setName(String name){
        current.setName(name);
    }
    
    /**
     * Delegate method of setter Status in EntModel
     * @see unisalento.fcorvino.beans.EntModel#status
     * 
     * @param modelStatus 
     */
    public void setStatus(ModelStatus modelStatus) {
        current.setStatus(modelStatus);
    }    
    
    /**
     * Delegate method of setter TypeModel in EntModel
     * @see unisalento.fcorvino.beans.EntModel#typeModel
     * 
     * This method controls if the typeModel is defined
     * 
     * @param modelStatus 
     */
    public void setType(String type){
       if(modelTypes.containsKey(type)){
           current.setTypeModel(modelTypes.get(type));
       } else System.out.println("Not found: " + type);
    }
    
    public static Set<String> getTypes(){
        return modelTypes.keySet();
    }
        
    /**
     * 
     * @return true if the configured model is valid
     */
    public Boolean isValid(){
        if(current.getName()==null) return false;
        if(factory.getModel(current.getName())!=null) return false;        
        if(current.getTypeModel()==null) return false;
        if(current.getStatus()!=ModelStatus.Incomplete){
            for(ModelTable t : current.getTypeModel().getTables()){
                ModelTableInstance instancet = current.getTable(t.getName());
                if(instancet!=null){
                    if(instancet.getIsLoad()) continue;
                }
                return false;
            }
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
    
    /**
     * Load a model in the factory
     * 
     * @param name identificator of model
     * @return 
     */
    public Boolean loadModel(String name){
        this.current = factory.getModel(name);
        if(this.current == null) return false;
        return true;
    }
    
    /**
     * Called by @see unisalento.fcorvino.controllers.FileUploadController
     * @return 
     * @deprecated use @see ModelsBuilder#loadTable
     */
    public EtlContext getContext(){
        EtlBaseContext context = new EtlBaseContext();
        context.setModel(current);
        return context;
    }
    
    public void loadTable(String source,String table,MultipartFile file) throws Exception {
        EtlBaseContext context = new EtlBaseContext();
        ModelTableInstance instance = new ModelTableInstance();
        context.setModel(current);
        context.setCurrentSource(source);
        context.setCurrentTable(table);
        context.parseFile(file.getBytes());
        instance.setIsLoad(true);
        instance.setSource(EtlContext.FileType.valueOf(source));
        instance.setSourceConfig(file.getName());
        current.putTable(table, instance);
        this.checkStatus();
    }
    
    public ModelParser createParser(){
        ModelParser parser = new ModelParser(this.current);
        parser.parse();
        return parser;
    }
    
    public Boolean save(){
        /** TODO make serialization of model */
        return false;
    }

    private void checkStatus() {
        this.current.setStatus(ModelStatus.Complete);
        boolean ret = this.isValid();
        System.out.println("checkStatus -> isValid: " + ret);
        if(!ret) this.current.setStatus(ModelStatus.Incomplete);
    }

}
