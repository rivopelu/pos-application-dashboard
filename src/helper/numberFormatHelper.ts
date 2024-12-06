export class NumberFormatterHelper {
  public convertOneDigits(value: any): number {
    if (typeof value === 'number') {
      return parseFloat(value?.toFixed(1))
    } else {
      return value
    }
  }

  private toLocaleString(num: number) {
    if (num) {
      return num.toLocaleString('id-ID')
    } else if (num === 0) {
      return '0'
    } else {
      return '-'
    }
  }

  public toRupiah(num?: number): string {
    if (num === 0) {
      return '0'
    } else {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(num ? parseInt(num.toFixed()) : 0)
    }
  }

  public NumberMinifyFormatter(num: number) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    } else {
      return num.toString()
    }
  }

  public thousandSeparator(num?: number): string {
    if (num) {
      return this.toLocaleString(this.convertOneDigits(num))
    } else {
      return '0'
    }
  }

  public toPercentage(num: number): string {
    return this.toLocaleString(this.convertOneDigits(num)) + '%'
  }

  public toIdrFormat(num: number) {
    return 'IDR ' + this.toLocaleString(this.convertOneDigits(num))
  }

  public sumArrayNumber(data: number[]): number {
    return data.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  public calculateTaxPercentage(price: number): number {
    return (price * 11) / 100
  }
}
