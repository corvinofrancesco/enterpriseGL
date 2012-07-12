package unisalento.fcorvino.model;

import java.util.ArrayList;
import java.util.List;
import unisalento.fcorvino.beans.Model;

/**
 *
 * @author Francesco Corvino
 */
public class ModelsFactory {
    private static ArrayList<Model> models 
            = new ArrayList<Model>();
    
    public List getModels(){
        return models;
    }
    
    public Model getModel(String name){
        Model m = new Model();
        m.setName(name);
        Integer i = models.indexOf(m);
        if(i!=-1) return models.get(i);
        return null;
    }
    
    public void addModel(Model model){
        models.add(model);
    }
}
