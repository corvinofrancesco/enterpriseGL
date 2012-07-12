package unisalento.fcorvino.etl.excel;

import java.util.Iterator;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco Corvino
 */
public class XSSFExcel extends Excel {

    @Override
    public Iterator getRowsIterator(POIFSFileSystem fileSystem) throws Exception {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Iterator getCellIterator(Object row) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Integer getNumCell(Object cell) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public EtlLoadTypes getTypeCell(Object cell) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public String getStringCell(Object cell) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Integer getIntegerCell(Object cell) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Double getDoubleCell(Object cell) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
