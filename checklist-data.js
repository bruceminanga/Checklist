const BUILTIN_ROADMAPS = {
    "savannah": {
        company: "Savannah Informatics",
        role: "Developer Operations",
        categories: [
            {
                title: "1. Software Engineering, Scripting & APIs",
                tasks: [
                    { id: "t1", title: "Python / Go / Ruby Proficiency", desc: "Core programming, data structures, and automation scripts." },
                    { id: "t2", title: "Shell Scripting", desc: "Master POSIX/Bash automation ('where there is a shell, there is a way')." },
                    { id: "t3", title: "API Architectures", desc: "Review communication patterns across REST, GraphQL, and RPC." },
                    { id: "t4", title: "Version Control (Git)", desc: "Branching strategies, interactive rebase, and code reviews." }
                ]
            },
            {
                title: "2. Database Management Systems",
                tasks: [
                    { id: "t5", title: "PostgreSQL Administration", desc: "Setup, connection pooling (PgBouncer), indexes, and tuning." },
                    { id: "t6", title: "Database Operations", desc: "Automated backups, Point-in-Time Recovery (PITR), and replication strategies." }
                ]
            },
            {
                title: "3. Cloud Platforms, Serverless & IaC",
                tasks: [
                    { id: "t7", title: "Cloud Platforms (GCP & AWS)", desc: "Compute engines, managed K8s (GKE/EKS), and object storage." },
                    { id: "t8", title: "Serverless & Messaging", desc: "Cloud Run / Lambda / Cloud Functions, and message queues (Pub/Sub, SQS)." },
                    { id: "t9", title: "Infrastructure as Code (Terraform)", desc: "Modular provisioning, remote state locking, and multi-environment setups." },
                    { id: "t10", title: "Ansible Playbooks (Core Automation)", desc: "Write, modify, and run production playbooks for server configuration." }
                ]
            },
            {
                title: "4. Containerization & Orchestration",
                tasks: [
                    { id: "t11", title: "Docker & Runtimes", desc: "Multi-stage builds, lean images, and Containerd/LXD internals." },
                    { id: "t12", title: "Kubernetes Architecture", desc: "Deployments, StatefulSets, Services, Ingress, RBAC, and Secrets." },
                    { id: "t13", title: "Helm v3 & Kustomize", desc: "Package manifests using Helm charts and overlay configs with Kustomize." }
                ]
            },
            {
                title: "5. CI/CD & Developer Experience",
                tasks: [
                    { id: "t14", title: "CI/CD Pipelines", desc: "Build automated delivery pipelines using GitLab CI/CD and GitHub Actions." },
                    { id: "t15", title: "Testing & SAST", desc: "Automated linting, static code analysis, and image vulnerability scans (Trivy)." },
                    { id: "t16", title: "Deployment Strategies", desc: "Zero-downtime Rolling, Blue-Green, and Canary releases." },
                    { id: "t17", title: "Developer Experience (DevEx)", desc: "Standardize dev/staging/prod environments and assist devs with debugging." }
                ]
            },
            {
                title: "6. SRE & Observability",
                tasks: [
                    { id: "t18", title: "SLIs, SLOs & Error Budgets", desc: "Define, measure, and track user-facing reliability metrics." },
                    { id: "t19", title: "Monitoring & Dashboards", desc: "Configure Prometheus, Grafana, and Alertmanager routing." },
                    { id: "t20", title: "Logging & Tracing", desc: "Centralized log aggregation (Loki/ELK) and tracing (OpenTelemetry)." },
                    { id: "t21", title: "Incident Management & RCA", desc: "Conduct blameless Post-Incident Reviews (PIR) and Root Cause Analyses." }
                ]
            },
            {
                title: "7. Tech Financial Operations",
                tasks: [
                    { id: "t22", title: "Cost Tracking & Budgeting", desc: "Multi-cloud billing alerts, budget thresholds, and spend tracking." },
                    { id: "t23", title: "Cost Allocation Models", desc: "Tagging strategies to attribute infrastructure expenses by team/service." },
                    { id: "t24", title: "FinOps Reporting", desc: "Prepare periodic efficiency and right-sizing reports for management." }
                ]
            },
            {
                title: "8. Networking, Security & Compliance",
                tasks: [
                    { id: "t25", title: "Networking Fundamentals", desc: "OSI model, TCP/IP, UDP, ICMP, DHCP, DNS, HTTP/S, and SMTP." },
                    { id: "t26", title: "Cloud Security & Networking", desc: "Setup VPCs, subnets, NAT, routing, least-privilege IAM, TLS, and Vault." },
                    { id: "t27", title: "Healthcare Compliance", desc: "Data-at-rest/in-transit encryption, audit trails, and health data privacy." }
                ]
            },
            {
                title: "9. Leadership & Portfolio Readiness",
                tasks: [
                    { id: "t28", title: "Mentorship & Leadership", desc: "Guide junior engineers and align technical operations with business goals." },
                    { id: "t29", title: "Portfolio Alignment", desc: "Showcase Ansible, PostgreSQL, K8s, FinOps, and multi-cloud labs." }
                ]
            }
        ]
    },
    "safaricom": {
        company: "Safaricom PLC",
        role: "Cloud Platform Engineer",
        categories: [
            {
                title: "1. Multi-Cloud & Enterprise Infrastructure",
                tasks: [
                    { id: "sf1", title: "AWS & Azure Hybrid Cloud", desc: "Practice hybrid architectures connecting on-premises data centers to AWS/Azure." },
                    { id: "sf2", title: "Terraform at Scale", desc: "Write enterprise Terragrunt or multi-account AWS Landing Zone Terraform modules." },
                    { id: "sf3", title: "Network Direct Connect & ExpressRoute", desc: "High-throughput dedicated interconnects and BGP routing." }
                ]
            },
            {
                title: "2. Kubernetes & Microservices Architecture",
                tasks: [
                    { id: "sf4", title: "Enterprise EKS/AKS Administration", desc: "Manage multi-tenant clusters, CNI networking, and node autoscaling." },
                    { id: "sf5", title: "Service Mesh (Istio / Linkerd)", desc: "Traffic routing, mutual TLS (mTLS), and distributed service observability." },
                    { id: "sf6", title: "Kafka & Event Streaming", desc: "Reliable event pub/sub architectures for massive financial transaction loads." }
                ]
            },
            {
                title: "3. Fintech Security, FinOps & Telco Compliance",
                tasks: [
                    { id: "sf7", title: "Fintech Security & PCI-DSS", desc: "Review cryptographic key management (KMS/HSM) and payment data isolation." },
                    { id: "sf8", title: "Cloud FinOps & Enterprise Unit Economics", desc: "Enterprise cloud cost showback/chargeback models across business units." },
                    { id: "sf9", title: "High-Availability Disaster Recovery", desc: "Active-Active multi-region failover and zero-data-loss RPO/RTO strategies." }
                ]
            }
        ]
    }
};