package unisalento.fcorvino.etl;

import unisalento.fcorvino.beans.Model;

/**
 * This interface define the context of a etl.
 * 
 * In this class the client sets the configuration to extabilish
 * the type of elaborations to apply to extract-transform-load data
 * 
 * @author Francesco Corvino
 */
public interface EtlContext {
    public enum FileType {
        hssf, xssf, TEXTUAL, MYSQL
    };
    
    public enum EntriesType {
        Particle, Relation
    };

    public void setModel(Model model);
    
    public Model getModel();
    
    /**
     * Called by @see EtlStrategy to retrive bytes to elaborate
     * @return the bytes to elaborate
     */
    public byte[] getBytes();
    
    /**
     * Called by @see EtlStrategy to know how import a bean
     * @return a object with interface @see EntLoadBean to correctly import the bean
     */
    public EtlLoadBean getImporter();
    
    /**
     * Recall the method execute of strategy 
     * 
     * @param bytesFile
     * @param type the type of entries to add in the model
     */
    public void parseFile(byte[] bytesFile) throws Exception;
    
    /**
     * Method called by Context clients to configure strategy to be executed
     * 
     * @param  strategyId identificator of strategy to execute
     */
    public void setCurrentSource(String strategyId) throws Exception;
    
    /**
     * 
     * @param tableId 
     */
    public void setCurrentTable(String tableId) throws Exception;
}
