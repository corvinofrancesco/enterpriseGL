package unisalento.fcorvino.etl;

import unisalento.fcorvino.beans.Model;
import unisalento.fcorvino.etl.excel.HSSFExcel;
import unisalento.fcorvino.etl.excel.XSSFExcel;
import unisalento.fcorvino.etl.loader.ParticleLoader;
import unisalento.fcorvino.etl.loader.RelationLoader;

/**
 *
 * @author Francesco Corvino
 */
public class EtlBaseContext implements EtlContext {
    
    /**
     * Dati temporanei del contesto
     */
    
    private FileType dataFileType;
    
    private EntriesType entriesType;
    
    private byte[] cacheFile;
    
    private EtlStrategy strategy;
    
    private Model model;
    
    /**
     * Costruttore
     */
    public EtlBaseContext(){
        this.dataFileType = null;
        this.entriesType = null;
        this.strategy = null;
        this.cacheFile = null;
        this.model = new Model();
    }

    public void setDataFileType(FileType fileType) {
        this.dataFileType = fileType;
        switch(fileType){
            case HSSFEXCEL: this.strategy = new HSSFExcel(); break;
            case XSSFEXCEL: this.strategy = new XSSFExcel(); break;
            default: break;
        }
    }
    
    public FileType getDataFileType(){
        return this.dataFileType;
    }
    
    public void setEntriesType(EntriesType entriesType) {
        this.entriesType = entriesType;
    }
    
    public EntriesType getEntriesType() {
        return this.entriesType;
    }    

    public void setModel(Model model) {
        this.model = model;
    }

    public Model getModel() {
        return model;
    }

    public byte[] getBytes() {
        return this.cacheFile;
    }

    public void parseFile(byte[] bytesFile, EntriesType type ) {
        this.cacheFile = bytesFile;
        if(this.dataFileType == null) return;
        this.strategy.execute(this);
    }

    public EtlLoadBean getImporter() {
        switch(this.entriesType){
            case Particle: return new ParticleLoader();
            case Relation: return new RelationLoader();
        }
        return null;
    }

}
