const avgSalaryPerEmployee = 90000;
let employees = 1;
const savingsPerEmployee = 30000;

function updateChart() {
    const totalSavings = savingsPerEmployee * employees;
    const expenseBeforeOutsourcing = avgSalaryPerEmployee * employees;
    const expenseAfterOutsourcing = expenseBeforeOutsourcing - totalSavings;

    employeeChart.data.datasets[0].data = [savingsPerEmployee, expenseBeforeOutsourcing, totalSavings, expenseAfterOutsourcing];
    employeeChart.update();

    document.getElementById('employeeCount').innerText = `Employees: ${employees}`;
}

function changeEmployees(change) {
    employees = Math.max(0, employees + change);
    updateChart();
}

const ctx = document.getElementById('employeeChart').getContext('2d');
const employeeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Savings / Employee', 'Expense before outsourcing', 'Total Savings / x Employees', 'Expense After Outsourcing'],
        datasets: [{
            label: '$CAD',
            data: [savingsPerEmployee, avgSalaryPerEmployee, savingsPerEmployee, avgSalaryPerEmployee - savingsPerEmployee],
            backgroundColor: ['#FF9F40', '#FF6384', '#36A2EB', '#4BC0C0'],
            hoverBackgroundColor: ['#FF9F40', '#FF6384', '#36A2EB', '#4BC0C0']
        }]
    },
    options: {
        plugins: {
            datalabels: {
                color: 'white',
                anchor: 'end',
                align: 'start',
                offset: -10,
                formatter: (value) => `$CAD ${value.toLocaleString()}`,
                font: {
                    weight: 'bold',
                    size: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `$CAD ${context.raw.toLocaleString()}`;
                        return label;
                    }
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$CAD ' + value.toLocaleString();
                    }
                }
            }
        }
    }
});
