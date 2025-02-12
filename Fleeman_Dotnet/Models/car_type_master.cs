using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Fleeman_Dotnet.Models;

[Table("car_type_master")]
public partial class car_type_master
{
    [Key]
    public long cartype_id { get; set; }

    [StringLength(255)]
    public string? cartype_name { get; set; }

    public double? daily_rate { get; set; }

    [StringLength(255)]
    public string? image_path { get; set; }

    public double? monthly_rate { get; set; }

    public double? weekly_rate { get; set; }

    [InverseProperty("cartype")]
    public virtual ICollection<booking_header_table> booking_header_tables { get; set; } = new List<booking_header_table>();

    [InverseProperty("cartype")]
    public virtual ICollection<car_master> car_masters { get; set; } = new List<car_master>();
}
