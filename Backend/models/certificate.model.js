
class CertificateModel {
    constructor(holder, issuer, data, sign, isRevoked) {
        this.holder = holder;
        this.issuer = issuer;
        this.data = data;
        this.sign = sign;
        this.isRevoked = isRevoked;
    }
    
}

module.exports = CertificateModel;
