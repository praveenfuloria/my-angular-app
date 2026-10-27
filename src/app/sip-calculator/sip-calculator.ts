import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-sip-calculator',
  styleUrl: './sip-calculator.css',
  templateUrl: './sip-calculator.html',
})
export class SipCalculator {
  title: string = 'SIP Returns Calculator';

  constructor() {
    this.calculateReturns();
  }
  //Input parameters
  monthlyAmount: number = 5000;
  investmentPeriod: number = 10; //in years
  expectedReturnRate: number = 12; //percentage

  //For safe navigation demo
  //fundName: string | null = null;

  //Calculated results
  totalInvestment: number = this.monthlyAmount * 12 * this.investmentPeriod;
  maturityAmount = 1162000; //Simplified calculation for now
  estimatedReturns = this.maturityAmount - this.totalInvestment;

  //Calculate actual SIP returns
  calculateReturns(): void {
    //console.log("Calculate button clicked!");
    this.totalInvestment = this.monthlyAmount * 12 * this.investmentPeriod;

    //Simplified SIP calculation
    const monthlyRate = this.expectedReturnRate / 12 / 100;
    const months = this.investmentPeriod * 12;

    //Using compound interest formula for SIP
    const compoundFactor = Math.pow(1 + monthlyRate, months);
    this.maturityAmount = Math.round(
      this.monthlyAmount * ((compoundFactor - 1) / monthlyRate) * (1 + monthlyRate),
    );

    //Calculate returns
    this.estimatedReturns = this.maturityAmount - this.totalInvestment;
  }

  //For property binding examples
  //logoUrl: string = 'assets/logo.png';
  buttonTooltip: string = 'Click to re-calculate with current values';

  //Simple calculation method
  calculateYearlyInvestment(): number {
    return this.monthlyAmount * 12;
  }

  //Method to adjust monthly amount
  // adjustAmount(amount: number): void {
  //  this.monthlyAmount = Math.max(0, this.monthlyAmount + amount);
  //}

  //Method to show event details
  //showEventDetails(event: MouseEvent): void {
  // console.log('Clicked at coordinates: ', event.clientX, event.clientY);
  //}
  //Input event handlers
  onPeriodComplete(event: Event): void {
    console.log('Change event fired');
  }

  //Property for tracking currently editing field
  currentlyEditing: string = '';

  onFieldFocus(fieldName: string): void {
    this.currentlyEditing = fieldName;
  }

  onFieldBlur(): void {
    this.currentlyEditing = '';
  }
}
