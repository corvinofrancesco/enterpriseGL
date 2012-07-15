package unisalento.fcorvino.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * This class manage the upload of model from excel or other formats
 * 
 * @author Francesco Corvino
 */
@Controller
public class ModelLoader {
    private Logger logger;
    
    public ModelLoader(){
        logger = Logger.getLogger(ModelLoader.class.getName());        
    }
    
    @RequestMapping(value = "/form", method= RequestMethod.POST)
    public String handleUpload(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {
        
        if(!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                readExcel(bytes);
            } catch (IOException ex) {
                logger.log(Level.SEVERE, null, ex);
            }
            return "redirect:uploadSuccess";
        } else {
            return "redirect:uploadFailure";
        }
    }
    
    private void readExcel(byte[] excelFile){
        String ret = "";
        try {
            POIFSFileSystem fileSystem = null;         
            try{//get the excel document
                fileSystem = new POIFSFileSystem(
                        new ByteArrayInputStream(excelFile));
            }catch (Exception e) {
                logger.log(Level.INFO, "The file uploaded is not an excel file");
                return;
            }
            HSSFWorkbook workBook = new HSSFWorkbook (fileSystem);
            HSSFSheet sheet = workBook.getSheetAt (0);
            Iterator<Row> rows = sheet.rowIterator();
 
            //for each row in the spreadsheet
            while (rows.hasNext()){
                Row row = rows.next();
 
                // display row number in the console.
                System.out.println ("Row No.: " + row.getRowNum());
 
                // once get a row its time to iterate through cells.
                Iterator<Cell> cells = row.cellIterator();
 
                while (cells.hasNext ()){
                    Cell cell = cells.next();
 
                    System.out.println ("Cell No.: " + cell.getColumnIndex());
 
                    /*
                     * Now we will get the cell type and display the values
                     * accordingly.
                     */
                    switch (cell.getCellType ()){
                        case HSSFCell.CELL_TYPE_NUMERIC :
                        {                      
                            // cell type numeric.
                            System.out.println ("Numeric value: " + cell.getNumericCellValue());                    
                            break;
                        }
 
                        case HSSFCell.CELL_TYPE_STRING :
                        {                      
                            // cell type string.
                            RichTextString richTextString = cell.getRichStringCellValue ();
 
                            System.out.println ("String value: " + richTextString.getString ());
 
                            break;
                        }
 
                        default :
                        {                          
                            // types other than String and Numeric.
                            System.out.println ("Type not supported.");
 
                            break;
                        }
                    }
                }
            }
 
        } catch (IOException e) {
            logger.log(Level.SEVERE, "error reading excel file",e);
        }        
    }
    
    
}
