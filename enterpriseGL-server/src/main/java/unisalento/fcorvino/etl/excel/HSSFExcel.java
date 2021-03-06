package unisalento.fcorvino.etl.excel;

import java.io.InputStream;
import java.util.Iterator;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco Corvino
 */
public class HSSFExcel extends Excel{

    @Override
    public Iterator getRowsIterator(InputStream fileSystem) 
            throws Exception {
        HSSFWorkbook workBook = new HSSFWorkbook (fileSystem);
        HSSFSheet sheet = workBook.getSheetAt (0);
        Iterator<Row> rows = sheet.rowIterator();        
        return rows;
    }

    @Override
    public Iterator getCellIterator(Object row) {
        Row hssfrow = (Row) row;
        return hssfrow.cellIterator();
    }

    @Override
    public Integer getNumCell(Object cell) {
        HSSFCell hssfcell = (HSSFCell) cell;
        return new Integer(hssfcell.getCellNum());    
    }

    @Override
    public EtlLoadTypes getTypeCell(Object cell) {
        HSSFCell hssfcell = (HSSFCell) cell;
        EtlLoadTypes type = null;
        switch(hssfcell.getCellType()){
            case HSSFCell.CELL_TYPE_NUMERIC:                 
                if(HSSFDateUtil.isCellDateFormatted(hssfcell))
                    return EtlLoadTypes.EtlData;
                else return EtlLoadTypes.EtlNumeric;
            case HSSFCell.CELL_TYPE_STRING: return EtlLoadTypes.EtlText;
            case HSSFCell.CELL_TYPE_FORMULA: 
                switch (hssfcell.getCachedFormulaResultType()){
                    case HSSFCell.CELL_TYPE_STRING:
                        return EtlLoadTypes.EtlText;
                    case HSSFCell.CELL_TYPE_NUMERIC:
                        if(HSSFDateUtil.isCellDateFormatted(hssfcell))
                            return EtlLoadTypes.EtlData;
                        else return EtlLoadTypes.EtlNumeric;
                        default:
                }
        }
        return type;
    }

    @Override
    public String getStringCell(Object cell) {
        HSSFCell hssfcell = (HSSFCell) cell;
        HSSFRichTextString richTextString =
                hssfcell.getRichStringCellValue();
        return richTextString.getString();
    }

    @Override
    public Integer getIntegerCell(Object cell) {
        HSSFCell hssfcell = (HSSFCell) cell;
        int ret = (int) hssfcell.getNumericCellValue();
        Integer i = new Integer(ret);
        return i;
    }
    
    @Override
    public Double getDoubleCell(Object cell) {
        HSSFCell hssfcell = (HSSFCell) cell;
        return hssfcell.getNumericCellValue();
    }
    
}
