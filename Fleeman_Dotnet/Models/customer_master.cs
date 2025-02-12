using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Fleeman_Dotnet.Models;

[Table("customer_master")]
[Index("email", Name = "UKsnf65l86t4b0xj6v0f9nymegs", IsUnique = true)]
public partial class customer_master
{
    [Key]
    public int cust_id { get; set; }

    [StringLength(255)]
    public string? address_line1 { get; set; }

    [StringLength(255)]
    public string? address_line2 { get; set; }

    [StringLength(255)]
    public string? city { get; set; }

    [StringLength(255)]
    public string? credit_card_number { get; set; }

    [StringLength(255)]
    public string? credit_card_type { get; set; }

    public DateOnly? date_of_birth { get; set; }

    [StringLength(255)]
    public string? driving_license_number { get; set; }

    public string? email { get; set; }

    [StringLength(255)]
    public string? first_name { get; set; }

    [StringLength(255)]
    public string? idp_number { get; set; }

    [StringLength(255)]
    public string? issued_bydl { get; set; }

    [StringLength(255)]
    public string? last_name { get; set; }

    [StringLength(255)]
    public string? mobile_number { get; set; }

    public DateOnly? passport_issue_date { get; set; }

    [StringLength(255)]
    public string? passport_issued_by { get; set; }

    [StringLength(255)]
    public string? passport_number { get; set; }

    public DateOnly? passport_valid_from { get; set; }

    public DateOnly? passport_valid_through { get; set; }

    [StringLength(255)]
    public string? phone_number { get; set; }

    [StringLength(255)]
    public string? pincode { get; set; }

    public DateOnly? valid_throughdl { get; set; }

    [InverseProperty("cust")]
    public virtual ICollection<booking_header_table> booking_header_tables { get; set; } = new List<booking_header_table>();

    [InverseProperty("cust")]
    public virtual ICollection<invoice_header_table> invoice_header_tables { get; set; } = new List<invoice_header_table>();
}
