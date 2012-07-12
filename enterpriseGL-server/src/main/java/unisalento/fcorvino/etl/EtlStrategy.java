package unisalento.fcorvino.etl;

import unisalento.fcorvino.beans.Model;

/**
 *
 * @author Francesco Corvino
 */
public interface EtlStrategy {
    
    public Model execute(EtlContext context);
    
}
