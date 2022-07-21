import metronomeStringBuilder from './metronomeStringBuilder';
import { SubDivision } from './models-interfaces';

class TempoPreview extends metronomeStringBuilder {
  private subDivision: SubDivision = 4;

  private metronomeString = '1000100010001000';

  public getMetronomeString() {
    return this.metronomeString;
  }

  public getSubDivision() {
    return this.subDivision;
  }
}

export default TempoPreview;
