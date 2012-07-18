package unisalento.fcorvino.etl.excel;

import java.io.InputStream;
import java.util.Iterator;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco Corvino
 */
public class XSSFExcel extends Excel {

    @Override
    public Iterator getRowsIterator(InputStream fileSystem) throws Exception {
        Workbook workBook = new XSSFWorkbook(fileSystem);
        Sheet sheet = workBook.getSheetAt (0);
        Iterator<Row> rows = sheet.rowIterator();        
        return rows;
    }

    @Override
    public Iterator getCellIterator(Object row) {
        Row xssfrow = (Row) row;
        return xssfrow.cellIterator();
    }

    @Override
    public Integer getNumCell(Object cell) {
        Cell xssfcell = (Cell) cell;
        return new Integer(xssfcell.getColumnIndex());   
    }

    @Override
    public EtlLoadTypes getTypeCell(Object cell) {
        Cell xssfcell = (Cell) cell;
        EtlLoadTypes type = null;
        switch(xssfcell.getCellType()){
            case Cell.CELL_TYPE_NUMERIC: 
                if(DateUtil.isCellDateFormatted(xssfcell))
                    return EtlLoadTypes.EtlData;
                else return EtlLoadTypes.EtlNumeric;
            case Cell.CELL_TYPE_STRING: return EtlLoadTypes.EtlText;
            case Cell.CELL_TYPE_FORMULA: 
            switch (xssfcell.getCachedFormulaResultType()){
                case Cell.CELL_TYPE_STRING:
                    return EtlLoadTypes.EtlText;
                case Cell.CELL_TYPE_NUMERIC:
                    if(DateUtil.isCellDateFormatted(xssfcell))
                        return EtlLoadTypes.EtlData;
                    else return EtlLoadTypes.EtlNumeric;
                    default:
            }
        }
        return type;
    }

    @Override
    public String getStringCell(Object cell) {
        Cell xssfcell = (Cell) cell;
        RichTextString richTextString =
                xssfcell.getRichStringCellValue();
        return richTextString.getString();
    }

    @Override
    public Integer getIntegerCell(Object cell) {
        Cell xssfcell = (Cell) cell;
        int ret = (int) xssfcell.getNumericCellValue();
        Integer i = new Integer(ret);
        return i;
    }

    @Override
    public Double getDoubleCell(Object cell) {
        Cell xssfcell = (Cell) cell;
        return xssfcell.getNumericCellValue();
    }
    
}
