package unisalento.fcorvino.etl;

import unisalento.fcorvino.beans.EntModel;

/**
 *
 * @author Francesco Corvino
 */
public interface EtlStrategy {
    
    public EntModel execute(EtlContext context);
    
}
