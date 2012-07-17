/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.model;

import java.util.Iterator;
import java.util.Set;
import junit.framework.TestCase;
import unisalento.fcorvino.beans.Model;

/**
 *
 * @author Francesco
 */
public class ModelsBuilderTest extends TestCase {
    
    public ModelsBuilderTest(String testName) {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }

    /**
     * Test of getTypes method, of class ModelsBuilder.
     */
    public void testGetTypes() {
        System.out.println("getTypes");
        Set result = ModelsBuilder.getTypes();
        Iterator<String> it = ModelsBuilder.getTypes().iterator();
        for(;it.hasNext();){
            String a = it.next();
            System.out.println("<" + a + ">");
        }
        assertEquals(true,result.size()>0);
    }

    /**
     * Test of isValid method, of class ModelsBuilder.
     */
//    public void testIsValid() {
//        System.out.println("isValid");
//        ModelsBuilder instance = new ModelsBuilder();
//        assertFalse(instance.isValid());
//        Model m = new Model();
//        m.setName("provaUnivoco");
//        instance.setModel(m);
//        instance.setType("personal");
//        assertTrue(instance.isValid());
//    }

    /**
     * Test of build method, of class ModelsBuilder.
     */
    public void testBuild() {
        System.out.println("build");
        ModelsBuilder instance = new ModelsBuilder();
        Model m = new Model();
        m.setName("provaUnivoco");
        instance.setModel(m);
        instance.setType( (String)
                ModelsBuilder.getTypes().toArray()[0]);//"personal");
        assertTrue(m.getTypeModel() != null);
        assertTrue(instance.build());
    }
}
