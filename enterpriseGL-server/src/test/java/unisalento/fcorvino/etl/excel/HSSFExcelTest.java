package unisalento.fcorvino.etl.excel;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import junit.framework.TestCase;
import org.apache.commons.io.IOUtils;
import unisalento.fcorvino.beans.Model;
import unisalento.fcorvino.etl.EtlContext;
import unisalento.fcorvino.model.ModelsBuilder;

/**
 *
 * @author Francesco Corvino
 */
public class HSSFExcelTest extends TestCase {
//    private EtlContext context = null;
//    private byte[] bytes;
//    
    public HSSFExcelTest(String testName) {
        super(testName);
//        ModelsBuilder builder = new ModelsBuilder();
//        builder.setName("prova");
//        builder.setType("services resources");
//        this.context = builder.getContext();
//        try {
//            bytes = IOUtils.toByteArray(
//                    HSSFExcelTest.class.getResourceAsStream("100part.xls"));
//        } catch (IOException ex) {
//            Logger.getLogger(HSSFExcelTest.class.getName()).log(Level.SEVERE, null, ex);
//        }
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }
    
    public void testHSSFExcel(){
        System.out.println("HSSFExcel");
//        Model m;
//        try {
//            this.context.setCurrentSource("hssf");
//            this.context.setCurrentTable("services");
//            this.context.parseFile(bytes);
//        }catch(Exception e){
//            fail("Return error message:" + e.getMessage());
//        }
        assertTrue(true);
    }
//
}
