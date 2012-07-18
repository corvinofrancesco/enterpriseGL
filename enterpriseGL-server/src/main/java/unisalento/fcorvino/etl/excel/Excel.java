package unisalento.fcorvino.etl.excel;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Iterator;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.etl.EtlContext;
import unisalento.fcorvino.etl.EtlLoadBean;
import unisalento.fcorvino.etl.EtlStrategy;

/**
 *
 * @author Francesco Corvino
 */
public abstract class Excel implements EtlStrategy {

    public EntModel execute(EtlContext context) {
        EntModel m = new EntModel();
        Iterator rows = null;         
        try{ 
            //get the excel document
            InputStream fileSystem = new ByteArrayInputStream(context.getBytes());            
            rows = getRowsIterator(fileSystem);
        } catch (Exception e) { 
            return m;
        }
        // ricava le informazioni sul modello 
        EtlLoadBean importer = context.getImporter();
        while(rows.hasNext()){
            Object row = rows.next();
            Iterator cells = getCellIterator(row);
            while(cells.hasNext()){
                Object cell = cells.next();
                Integer id = getNumCell(cell);
                EtlLoadBean.EtlLoadTypes type = getTypeCell(cell);
                // TODO ricava il valore dell'attributo
                Object value = null;
                if(type!=null){
                    switch(type){
                        case EtlText: value = getStringCell(cell); break;
                        case EtlNumeric: value = getIntegerCell(cell); break;
                        case EtlData:
                        default:
                            continue;
                    }
                    importer.addField( id, type, value);
                }
            }
            importer.addBeanTo(context.getModel());
            importer.clearData();
        }
        return m;
    }
    
    abstract public Iterator getRowsIterator(InputStream fileSystem) throws Exception;
    
    abstract public Iterator getCellIterator(Object row);
    
    abstract public Integer getNumCell(Object cell);
    
    abstract public EtlLoadBean.EtlLoadTypes getTypeCell(Object cell);
    
    abstract public String getStringCell(Object cell);
    
    abstract public Integer getIntegerCell(Object cell);
    
    abstract public Double getDoubleCell(Object cell);
}
