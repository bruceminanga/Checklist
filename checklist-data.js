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

    "Kubernetes Concepts": {
        "company": "KUBERNETES — Every Concept, Nothing Missing",
        "role": "Kubernetes & Platform Engineer",
        "categories": [
            {
                "title": "1. Cluster Architecture & Core API Primitives",
                "tasks": [
                    {
                        "id": "task_1",
                        "title": "Control Plane & Worker Architecture",
                        "desc": "Understand core components including kube-apiserver, etcd, kube-scheduler, controller-managers, kubelet, kube-proxy, container runtimes (CRI-O/containerd), and bootstrapping tools like kubeadm or managed EKS/GKE/AKS."
                    },
                    {
                        "id": "task_2",
                        "title": "Core API Objects, Spec, and Status",
                        "desc": "Master Kubernetes declarative modeling, GVK/GVR type identification, Spec vs. Status patterns, and system metadata including UIDs, OwnerReferences, and Finalizers."
                    },
                    {
                        "id": "task_3",
                        "title": "Labels, Selectors, and Recommended Conventions",
                        "desc": "Implement object filtering and grouping using app.kubernetes.io/* standardized community labels, automated namespace labels, and non-identifying annotations."
                    },
                    {
                        "id": "task_4",
                        "title": "Internal System Mechanics & APF",
                        "desc": "Configure API Priority and Fairness (APF) via FlowSchema and PriorityLevelConfiguration, manage Node heartbeats/leader elections using Leases, and define sandboxed runtimes with RuntimeClass."
                    }
                ]
            },
            {
                "title": "2. Workload Controllers & Pod Lifecycle",
                "tasks": [
                    {
                        "id": "task_5",
                        "title": "Pod Design & Multi-Container Patterns",
                        "desc": "Build Pods leveraging Init Containers for setup tasks, native sidecars, ephemeral containers for live troubleshooting, and ImagePullPolicy options."
                    },
                    {
                        "id": "task_6",
                        "title": "Stateless Workloads (Deployments & ReplicaSets)",
                        "desc": "Deploy scalable stateless apps with Deployments, configure RollingUpdate and Recreate strategies, tune maxSurge/maxUnavailable, and leverage minReadySeconds for rollout stability."
                    },
                    {
                        "id": "task_7",
                        "title": "Stateful and Specialized Workloads",
                        "desc": "Manage stateful topologies using StatefulSets with stable network identities, node-wide services using DaemonSets, and batch operations via Jobs and CronJobs."
                    },
                    {
                        "id": "task_8",
                        "title": "Lifecycle Management & Termination Handling",
                        "desc": "Implement postStart and preStop lifecycle hooks, handle graceful termination periods (SIGTERM to SIGKILL), and manage rollbacks using revision histories."
                    }
                ]
            },
            {
                "title": "3. Networking, Ingress & Service Mesh",
                "tasks": [
                    {
                        "id": "task_9",
                        "title": "Services and Service Discovery",
                        "desc": "Configure ClusterIP, NodePort, LoadBalancer, Headless Services, and ExternalName with port/targetPort mappings, backed by CoreDNS and EndpointSlices."
                    },
                    {
                        "id": "task_10",
                        "title": "Ingress Controllers & Gateway API",
                        "desc": "Expose HTTP/HTTPS applications using Ingress and IngressClass, or adopt Gateway API resources including GatewayClass, Gateway, HTTPRoute, TCPRoute, and GRPCRoute."
                    },
                    {
                        "id": "task_11",
                        "title": "Service Mesh Integration",
                        "desc": "Deploy sidecar proxies (Envoy/Linkerd) to manage mTLS zero-trust communication, implement traffic control policies (retries, timeouts, circuit breaking), and align with the GAMMA Initiative."
                    },
                    {
                        "id": "task_12",
                        "title": "Network Security & CNI Policies",
                        "desc": "Deploy CNI plugins (Calico/Cilium) and enforce zero-trust network boundaries via default-deny NetworkPolicies and IP-block CIDR filtering."
                    }
                ]
            },
            {
                "title": "4. Storage Architecture & Persistence",
                "tasks": [
                    {
                        "id": "task_13",
                        "title": "Ephemeral and Node Volumes",
                        "desc": "Utilize pod-level storage types such as emptyDir for scratch space, hostPath for node-level mounting, projected volumes, and CSI-backed ephemeral volumes."
                    },
                    {
                        "id": "task_14",
                        "title": "Persistent Volumes & Dynamic Provisioning",
                        "desc": "Set up PersistentVolumes (PV) and bind them using PersistentVolumeClaims (PVC) managed dynamically through custom StorageClasses."
                    },
                    {
                        "id": "task_15",
                        "title": "CSI Ecosystem & Volume Snapshots",
                        "desc": "Integrate Container Storage Interface (CSI) drivers, track node bindings with CSINode and VolumeAttachment, and manage backups via VolumeSnapshot and VolumeSnapshotClass."
                    }
                ]
            },
            {
                "title": "5. Configuration, Security & Governance",
                "tasks": [
                    {
                        "id": "task_16",
                        "title": "Configuration & Immutable Rollouts",
                        "desc": "Decouple app settings using ConfigMaps, Secrets, ImagePullSecrets, Downward API, and content-based naming hashes for deterministic, zero-drift rolling updates."
                    },
                    {
                        "id": "task_17",
                        "title": "Role-Based Access Control (RBAC)",
                        "desc": "Configure granular access control using ServiceAccounts, Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings, integrated with external identity providers (OIDC)."
                    },
                    {
                        "id": "task_18",
                        "title": "Pod Security & Cluster Hardening",
                        "desc": "Enforce container isolation via SecurityContext (capabilities, seccomp, non-root execution), audit logs, and Pod Security Standards (Privileged, Baseline, Restricted) via PSA."
                    }
                ]
            },
            {
                "title": "6. Scheduling, Placement & Auto-Scaling",
                "tasks": [
                    {
                        "id": "task_19",
                        "title": "Advanced Pod Placement & Affinity",
                        "desc": "Steer workloads with Node Selectors, Node Affinity, Pod Affinity/Anti-Affinity, Taints, Tolerations, and multi-zone TopologySpreadConstraints."
                    },
                    {
                        "id": "task_20",
                        "title": "Priority, Preemption & Voluntary Disruptions",
                        "desc": "Configure PriorityClasses to drive workload preemption and safeguard application availability during updates or maintenance using PodDisruptionBudgets (PDBs)."
                    },
                    {
                        "id": "task_21",
                        "title": "Resource Quotas & Limits",
                        "desc": "Establish multi-tenant guardrails with Namespaces, LimitRanges, aggregate ResourceQuotas, and object-count limits to prevent API starvation."
                    },
                    {
                        "id": "task_22",
                        "title": "Auto-Scaling (HPA, VPA, Karpenter)",
                        "desc": "Automate scaling horizontally (HPA) and vertically (VPA), and implement dynamic node auto-provisioning using Karpenter or Cluster Autoscaler."
                    }
                ]
            },
            {
                "title": "7. Observability, Extensibility & GitOps Operations",
                "tasks": [
                    {
                        "id": "task_23",
                        "title": "Health Probes & Cluster Telemetry",
                        "desc": "Implement startup, liveness, and readiness probes alongside container stdout logs, Events inspection, and the Metrics API for health telemetry."
                    },
                    {
                        "id": "task_24",
                        "title": "Custom Resources & Operators",
                        "desc": "Extend the Kubernetes control plane by building Custom Resource Definitions (CRDs), Custom Resources (CRs), and Operator reconciliation loops."
                    },
                    {
                        "id": "task_25",
                        "title": "Admission Control & Native Policies",
                        "desc": "Intercept and validate cluster transactions using Mutating and Validating Webhook Configurations, or native CEL-based ValidatingAdmissionPolicies."
                    },
                    {
                        "id": "task_26",
                        "title": "Packaging & Manifest Tooling",
                        "desc": "Manage and deploy modular cluster manifests using Kustomize overlays, configure Kubeconfig context switches, and deploy GitOps synchronization engines (ArgoCD/Flux)."
                    }
                ]
            }
        ]
    },
};