package unisalento.fcorvino.etl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import unisalento.fcorvino.beans.Model;
import unisalento.fcorvino.beans.models.ModelTable;
import unisalento.fcorvino.etl.excel.HSSFExcel;
import unisalento.fcorvino.etl.excel.XSSFExcel;

/**
 *
 * @author Francesco Corvino
 */
public class EtlBaseContext implements EtlContext {
    
    /**
     * Dati temporanei del contesto
     */
    private Map<String,EtlStrategy> strategies = 
            new HashMap<String, EtlStrategy>();
    
    private byte[] cacheFile;
    
    private EtlStrategy currentSource;
    
    private Model currentModel;
    
    private ModelTable currentTable;
    
    /**
     * Costruttore
     */
    public EtlBaseContext(){
        this.currentSource = null;
        this.cacheFile = null;
        this.currentModel = new Model();
        strategies.put("hssf", new HSSFExcel());
        strategies.put("xssf", new XSSFExcel());
    }

    public void setModel(Model model) {
        this.currentModel = model;
    }

    public Model getModel() {
        return currentModel;
    }

    public byte[] getBytes() {
        return this.cacheFile;
    }

    public void parseFile(byte[] bytesFile) throws Exception {
        this.cacheFile = bytesFile;
        this.currentSource.execute(this);
    }

    public EtlLoadBean getImporter() {
        return currentTable.getLoader();
    }

    public void setCurrentSource(String strategyId) throws Exception{
        if(this.strategies.containsKey(strategyId)){
            // set strategy configurations
            this.currentSource = this.strategies.get(strategyId);
        } else{
            throw new Exception("sorce extractor " + strategyId + " not yet implemented");
        }
    }

    public void setCurrentTable(String tableId) throws Exception{
        Set<ModelTable> tables = this.currentModel.getTypeModel().getTables();
        Iterator<ModelTable> tablesIt = tables.iterator();
        for(;tablesIt.hasNext();){
            ModelTable mt  = tablesIt.next();
            System.out.println(mt.getName());
            if(tableId.equals(mt.getName())) {
                this.currentTable = mt;
                return;
            }
        }
        throw new Exception("not exist table: " + tableId);
    }

}
