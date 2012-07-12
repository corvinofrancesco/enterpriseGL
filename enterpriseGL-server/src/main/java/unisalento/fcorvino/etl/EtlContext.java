package unisalento.fcorvino.etl;

import java.util.Map;
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
        HSSFEXCEL, XSSFEXCEL, TEXTUAL
    };
    
    public enum EntriesType {
        Particle, Relation
    };
    
    public void setDataFileType(FileType fileType);
    
    public FileType getDataFileType();
    
    public void setEntriesType(EntriesType entriesType);
    
    public EntriesType getEntriesType();
    
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
    public void parseFile(byte[] bytesFile, EtlContext.EntriesType type);
    
}