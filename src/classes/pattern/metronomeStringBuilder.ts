import { SubDivision } from './models-interfaces';

abstract class MetronomeStringBuilder {
  public abstract getMetronomeString(): string;

  public abstract getSubDivision(): SubDivision;
}

export default MetronomeStringBuilder;
